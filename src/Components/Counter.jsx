import { Component } from "react";

export class Counter extends Component {

    constructor() {
        super();

        this.state = {
            count: 0
        }
    }

    increment = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    decrement = () => {
        this.setState({
            count: this.state.count - 1
        })
    }

    reset=()=>{
        this.setState({
            count: 0
        })
    }
    render() {
        return (
            <>
                <center>
                    <h1>Counter Application</h1>

                    <h2>
                        Counter Value: {this.state.count}
                    </h2>

                    <button
                        className="btn btn-primary m-3"
                        onClick={this.increment}>Increment</button>

                    <button
                        className="btn btn-danger m-3"
                        onClick={this.decrement}>Decrement</button>
                    <button
                        className="btn btn-success m-3"
                        onClick={this.reset}>Reset</button>
                </center>
            </>
        )
    }
}