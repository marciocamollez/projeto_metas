import React, {useState} from 'react';

import Menu from '../components/Menu';

import { Jumbotron, Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';


function Cadastrar(){

    //Atribui todos os campos do formulário ainda vazios em uma constante
    const [meta, setMeta] = useState({
        name: '',
        description: '',
        status: '',
    });

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    //Conforme digita, o value do input do HTML é preenchido e guardado na constante abaixo
    const onChangeInput = e => setMeta({ ...meta, [e.target.name]: e.target.value});

    //Função sendMeta é rodada após clicar no botão Enviar. O preventDefault impede de recarregar a página se houver erro após clicar em salvar. Após isso, envia os dados preenchidos para a API
    const sendMeta = async e => {
        e.preventDefault();
        setResponse({ formSave: true });

        //Tenta a conexão com a API do backend e define o método de envio POST e em formato JSON
        try{
            const res = await fetch('http://localhost:8080/metas', {
                method: 'POST',
                body: JSON.stringify(meta),
                headers: {'Content-Type': 'application/json'}
            });

            //Se não conseguir fazer a conexão com a API, retorna um erro.
            const responseEnv = await res.json();
            if(responseEnv.error){
                setResponse({
                    formSave: false,
                    type: 'error',
                    message: responseEnv.message
                });
            }else{
                setResponse({
                    formSave: false,
                    type: 'success',
                    message: responseEnv.message
                });
            }

        } catch{
            setResponse({
                formSave: false,
                type: 'error',
                message: 'Erro: Meta não cadastrada com sucesso, tente mais tarde!'
            });
        }
    }

    return (
        <div>
            <Menu />
            <Jumbotron fluid className="form">
                <style>
                    {`.form{
                        background-color: #171941;
                        color: #bf38ac;
                        padding-top: 30px;
                        padding-bottom: 150px;
                        margin-bottom: 0rem !important;
                    }`}
                </style>
                <Container>
                <h1 className="display-4 text-center">Cadastrar Meta</h1><hr />

                {response.type === 'error' ? <Alert color="danger">{response.message}</Alert > : ""}
                {response.type === 'success' ? <Alert color="success">{response.message}</Alert > : ""}

                <form onSubmit={sendMeta}>

                    <FormGroup>
                        <Label for="name">Nome </Label>
                        <Input type="text" name="name" id="name" placeholder="Nome da Meta" onChange={onChangeInput} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Descrição</Label>
                        <Input type="text" name="description" id="description" placeholder="Descrição da Meta" onChange={onChangeInput} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="status">Status</Label>
                        <Input type="text" name="status" id="status" placeholder="Status da Meta" onChange={onChangeInput} />
                    </FormGroup>

                    {response.formSave ? <Button type="submit" color="danger" disabled>Enviando...</Button> : <Button type="submit" outline color="primary">Cadastrar</Button>}

                </form>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default Cadastrar;