import React, { Component } from 'react';
import { Table, Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Container, Row, Col, Button, Jumbotron, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AlbumJASON from './Album.json';

export default class Content extends Component {
  state = {
    modal: false,
    cart: [],
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }
  checkout = (totalPrice) => {
    alert(`已從您的信用卡扣除${totalPrice}元`);
  }
  addToCart = (product) => {
    const cart = this.state.cart;
    console.log(product.title);
    cart.push(product);
    this.setState({
      cart,  // cart: cart
    });
  }
  render() {
    const TotalPrice = this.state.cart.reduce((sum, item) => sum + item.price, 0);

    return (
      <Container>
        <Row>
          <Col md="12">
            <Jumbotron>
              <h1 className="display-3">美克唱片</h1>
              <p className="lead">蓋瑞香香雞成立以來，結合各大雞肉通路</p>
              <hr className="my-2" />
              <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
              <p className="lead">
                <Button
                  onClick={this.toggle}
                  color="primary">
                  購物車({this.state.cart.length})
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          {
            AlbumJASON.map(product => (
              <Col xs="12" md="4">
                <Card>
                  <CardImg top width="100%" src={product.img} alt="Card image cap" />
                  <CardBlock>
                    <CardTitle>{product.title}</CardTitle>
                    <CardSubtitle>價格：NT.{product.price}</CardSubtitle>
                    <CardText>{product.desc}</CardText>
                    <Button
                      disabled={this.state.cart.find(item => item.id === product.id)}
                      onClick={() => this.addToCart(product)}
                     >購買</Button>
                  </CardBlock>
                </Card>
              </Col>
            ))
          }
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>購物車</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>品項</th>
                  <th>價格</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.cart.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(() => this.checkout(TotalPrice))}>結帳</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>取消</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}
