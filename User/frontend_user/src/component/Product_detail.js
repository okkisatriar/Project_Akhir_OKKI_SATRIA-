import React, { Component } from 'react'
import {Link, Route, Redirect} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

class Product_detail extends Component {
  state={
    id:'',
    harga : '',
    posting : '',
    alamat : '',
    deskripsi : '',
    foto_produk :'',
    foto_carousell :'',
    foto_carousell2 :'',
    redirect: false,
    nextpage: false
  }
  componentWillMount=() =>{
    var id_produk = this.props.location.state.id;
    axios.get('http://localhost:8002/produkdetail/' + id_produk).then((getData) => {
      console.log(getData.data)
      var id = getData.data[0].id
      var harga = getData.data[0].harga;
      var posting = getData.data[0].posting;
      var alamat = getData.data[0].alamat;
      var deskripsi = getData.data[0].deskripsi;
      var foto_produk = getData.data[0].foto_produk;
      var foto_carousell = getData.data[0].foto_carousell;
      var foto_carousell2 = getData.data[0].foto_carousell2;

      this.setState({
        id:id,
        harga: harga,
        alamat: alamat,
        posting : posting,
        deskripsi : deskripsi,
        foto_produk : foto_produk,
        foto_carousell : foto_carousell,
        foto_carousell2 : foto_carousell2
      });
    });   
  }

  // event buy
  buy(id,harga){
    var id = id
    var harga = harga
    axios.post(`http://localhost:8002/detail_cart`, 
    {
        id_produk:id,
        harga_produk:harga,
        id_user: cookies.get("login")
    })
    .then((response)=>{
        if(response.data === "berhasil")
        {
            this.setState({nextpage:true})
        }
    })
  }
  render() {

        //fungsi cookies
        if(cookies.get('login')<"1" || cookies.get('login')=== undefined)
        {
            {this.state.redirect= true}
            // this.props.dispatch({type:'Login', kirim: "gagal bro palsu lu" })
        }
        if(this.state.nextpage)
        {
            return <Redirect to="/Cart"/>
        }

        if(this.state.redirect)
        {
            return <Redirect to="/"/>
        }

    return (
      <div>
        <Header/>
        {/* CAROUSEL */}
        <div style={{marginTop: 75}}>
          <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                <li data-target="#carouselExampleIndicators" data-slide-to={2} />
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100" src={'http://localhost:8002/tampungfile/'+this.state.foto_produk} alt="First slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={'http://localhost:8002/tampungfile/'+this.state.foto_carousell} alt="Second slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={'http://localhost:8002/tampungfile/'+this.state.foto_carousell2} alt="Third slide" />
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* DETAIL */}
        <div className="container" style={{marginTop: 50}}>
          <div className="row">
            <div className="col-md-8">
              <div style={{borderBottom: '1px dotted grey'}}>
                <h2>Rp. {this.state.harga}</h2>
                <h3>{this.state.posting}</h3>
                <p>{this.state.alamat}</p>
              </div>
              <div style={{borderBottom: '1px dotted grey', marginTop: 20}}>
                <p>{this.state.deskripsi}</p>
              </div>
              <div style={{borderBottom: '1px dotted grey', marginTop: 20, padding: 20}}>
                <h4>Informasi Properti</h4>
                <div>
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a className="nav-link active show" data-toggle="tab" href="#profile">Spesifikasi</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#home">Fasilitas</a>
                    </li>
                  </ul>
                  <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade" id="home">
                    <p>Fasilitas yang di Dapat:</p>
                      * Carport <p/>
                      * Garden <p/>
                      * AC <p/>
                      * TV <p/>
                      * PAM <p/>
                      * Garasi <p/>
                      * Swimming Pool <p/>
                      * Keamanan 24 Jam<p/>
                    </div>
                    <div className="tab-pane fade active show" id="profile">
                    <p>Lokasi strategis:</p>
                      * Berada di Malang Kota<p/>
                      * Berada di area pengembangan Infrastruktur Kota Malang<p/>
                      * Sangat dekat dengan exit tol Surabaya Malang<p/>
                      * Sangat dekat dengan Block Office Kota Malang<p/>
                      * Dekat dengan rumah sakit<p/>
                      * View pegunungan yang bagus dan kualitas udara yang segar<p/>
                      * Hunian dengan konsep urban resort<p/>
                      * Fasilitas eco club house dan eco park<p/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" style={{backgroundColor: 'rgb(224, 224, 224)'}}>
                <div className="card-body">
                  <h5 className="card-title">BUY NOW</h5>
                  <button onClick={()=>this.buy(this.state.id, this.state.harga)} className="btn btn-success">ADD TO CART</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer/>
      </div>
    )
  }
}
export default Product_detail;