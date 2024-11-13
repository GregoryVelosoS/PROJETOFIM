CREATE DATABASE crudfinal;
USE crudfinal;

CREATE TABLE usuario(
	usu_id INT PRIMARY KEY AUTO_INCREMENT,
    usu_nome VARCHAR(100) NOT NULL,
    usu_email VARCHAR(100) NOT NULL UNIQUE,  
	usu_senha VARCHAR(100) NOT NULL,
    usu_tipo ENUM('administrador', 'gerente', 'funcionario'));
    
    INSERT INTO usuario (usu_nome,usu_email,usu_senha)
	VALUES ("email","email@email.com","email");
    
CREATE TABLE categoria(
	cat_id INT PRIMARY KEY AUTO_INCREMENT,
    cat_nome VARCHAR(40) NOT NULL);
    
CREATE TABLE itens(
	it_id INT PRIMARY KEY AUTO_INCREMENT,
    it_nome VARCHAR(100) NOT NULL,
	it_desc TEXT,  
	it_preco decimal(7,2) NOT NULL,
    it_dt_cad DATE DEFAULT(curdate()),
    it_imagem VARCHAR(100),
    it_cat INT,
    FOREIGN KEY (it_cat) REFERENCES categoria(cat_id)
);

CREATE VIEW item_categoria as
	SELECT *
    FROM crudfinal.itens as it
    INNER JOIN crudfinal.categoria as cat
    ON it.it_cat = cat.cat_id;

INSERT INTO categoria (cat_nome)
VALUES
    ('Eletrônicos'),
    ('Vestuário e Acessórios'),
    ('Alimentos e Bebidas'),
    ('Saúde e Beleza'),
    ('Móveis e Decoração'),
    ('Brinquedos e Jogos'),
    ('Esportes e Lazer'),
    ('Automóveis e Acessórios'),
    ('Casa e Jardim'),
    ('Tecnologia e Inovação');