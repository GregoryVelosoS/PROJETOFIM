import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardProduto = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/06/cristiano-ronaldo-portugal-euro-e1718204664360.jpg"
      />
      <Card.Body>
        <Card.Title>Nome Produto: {props.nome} </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          Preço: {props.preco}
        </Card.Subtitle>

        <Card.Text>Descrição: {props.descricao}</Card.Text>

        <Card.Text>Categoria: {props.categoria}</Card.Text>

        <Card.Link href={`/produtos/edicao/${props.id}`}>
          <Button variant="warning">Editar</Button>
        </Card.Link>

        <Card.Link href={`/produtos/excluir/${props.id}`}>
          <Button variant="danger">Excluir</Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CardProduto;
