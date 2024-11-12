//Importando components do bootstrap
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

const EditarProduto = () => {
  //Variáveis pro produto
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");

  // variaveis pro alerta
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none");
  const [alertaMensagem, setAlertaMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Cliquei");
  };

  return (
    <div>
      <Container>
        <h1>Editar Produto</h1>
        <form onSubmit={handleSubmit} className="mt-3">
          <Row>
            <Col xs={6}>
              {/* caixinha do nome */}
              <FloatingLabel
                controlId="floatingInputName"
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                />
              </FloatingLabel>

              {/* caixinha da descrição */}
              <Form.Group className="mb-3" controlId="formGridDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>

              {/* select da categoria*/}
              <Form.Group controlId="formGridTipo" className="mb-3">
                <Form.Label>Tipo de produto</Form.Label>
                <Form.Select defaultValue="Tipo de produto">
                  <option value="gerente">Alimentos</option>
                  <option value="funcionario">Bebidas</option>
                </Form.Select>
              </Form.Group>

              {/* caixinha de numero */}
              <FloatingLabel
                controlId="floatingInputPreco"
                label="Preco"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  step="0.1"
                  placeholder="Digite so preço"
                  value={preco}
                  onChange={(e) => {
                    setPreco(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Col>
            <Col xs={6}>
              {" "}
              <Form.Group controlId="formFileLg" className="mb-3">
                <Image
                  src="https://cdn.awsli.com.br/production/static/img/produto-sem-imagem.gif"
                  rounded
                  width={300}
                  height={250}
                />
                <br></br>
                <Form.Label className="mt-4">
                  Envie a foto do produto
                </Form.Label>
                <Form.Control
                  type="file"
                  size="lg"
                  value={imagem}
                  onChange={(e) => {
                    setImagem(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Alert key="danger" variant="danger" className={alertaClass}>
            {alertaMensagem}
          </Alert>

          <Button variant="primary" size="lg" type="submit">
            Editar
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditarProduto;
