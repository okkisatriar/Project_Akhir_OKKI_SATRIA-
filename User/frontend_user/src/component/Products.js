import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

class Products extends Component {
  state = {
    semuaproduk: []
  }
  componentWillMount = () => {
    axios.get('http://localhost:8002/semuaproduk').then((getData) => {
      console.log(getData.data)
      this.setState({
        semuaproduk: getData.data
      });
    });
    console.log(this.state.semuaproduk)
  }
  render() {
    const produklist = this.state.semuaproduk.map((isi, index) => {
      var urutan = index + 1;
      var id = isi.id;
      var posting= isi.posting;
      var harga = isi.harga;
      var alamat = isi.alamat;
      var fotoProperti = isi.foto_produk;
      console.log(id)
      return <div className="col-md-4"> 
        <div className="card">
          <img className="card-img-top" src={'http://localhost:8002/tampungfile/'+fotoProperti}  width={200} height={170}alt="Card image cap" />
          <div className="card-body" style={{textAlign: 'center'}}>
            <h5 className="card-title">{posting}</h5>
            <p className="card-text">{alamat}</p>
            <h4>IDR {harga} Juta</h4>
            <Link to={{pathname: '/Product_detail/' + id, state:{id:id}}} className="btn btn-primary">View Detail</Link>
          </div>
        </div>
      </div>
    })       

    return (
      <div>
        <Header/>
          {/* TITLE */}
          <div style={{textAlign: 'center', marginTop: 75}}>
          <h3 style={{fontWeight: 'bold'}}>PRODUCT LIST</h3>
        </div>

        {/* PROMO */}
        <div className="container" style={{marginTop: 75}}>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body" style={{backgroundColor: 'rgb(167, 167, 167)'}}>
                  <h5 className="card-title">Apartemen</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body" style={{backgroundColor: 'rgb(167, 167, 167)'}}>
                  <h5 className="card-title">Rumah</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LIST PRODUCTS */}
        <div className="container" style={{marginTop: 50}}>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-4">
                  <div className="list-group" id="list-tab" role="tablist">
                    <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="spesifikasi">Apartemen</a>
                    <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="fasilitas">Rumah</a>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                      <div className="row">

                      {/* Pembuat Baris*/}
                      {produklist}
                      </div>
                    </div>
                  </div>

                  {/* Pagination */}
                  <div style={{marginTop: 20, textAlign: 'center'}}>
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">«</a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">2</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">3</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">4</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">5</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">»</a>
                      </li>
                    </ul>
                  </div>

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
export default Products;