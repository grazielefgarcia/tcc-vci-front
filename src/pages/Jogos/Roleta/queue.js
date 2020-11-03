import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import store from "../../../config/store";
import { withRouter } from "react-router-dom";
import "./style.css";
import Header from "../../../components/Header";
import { Helmet } from "react-helmet";


class Queue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conexao: null,
            mensagem: "(1/2)",
        };
    }

    handleRedirect = (newPath) => {
        this.props.history.push(newPath);
    };

    componentDidMount() {
        const conexao = socketIOClient("http://localhost:4000");

        conexao.on("ready", (PLAYERS) => {
            let aux = false;
            for (var i = 0; i < PLAYERS.length; i++) {
                if (PLAYERS[i].id === conexao.id) {
                    aux = true;
                }
            }
            if (aux) {
                this.setState({
                    mensagem: "(2/2)",
                });

                setTimeout(() => {
                    store.dispatch({
                        type: "SET_CON",
                        payload: {
                            conexao: conexao,
                            player: PLAYERS,
                        },
                    });
                    this.handleRedirect("/jogos/roleta/");
                    // QUERIDO PRA, FAVOR REDIRECIONAR A PAGINA, BEIJOS DA CORNETA
                    // ASS. LUIZ HENRIQUE BELORIO
                }, 5000);
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Helmet title="Jogo 10" />
                <Header headerTitle="Jogo da Roleta" />

                <div className="LoadMessage">Procurando jogadores {this.state.mensagem}</div>
                <div className="PreLoader">
                    <div className="Loader">
                        <div className="Dots">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default withRouter(Queue);
