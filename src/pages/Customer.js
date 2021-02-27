import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import CustomerList from '../components/CustomerList'
import { base_url, customer_image_url } from '../config'
import $ from 'jquery'
import axios from 'axios'
export default class Customer extends Component {
    constructor() {
        super()
        this.state = {
            customers: [],
            token: "",
            action: "",
            name: '',
            phone: '',
            address: '',
            image: '',
            username: '',
            password: '',
            uploadFile: true,
            fillPassword: true,
            customer_id: "",
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getCustomers = () => {
        let url = base_url + "/customer"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ customers: response.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error)
                }
            })
    }

    componentDidMount() {
        this.getCustomers()
    }

    Add = () => {
        $("#modal_customer").modal('show')
        this.setState({
            action: "insert",
            customer_id: 0,
            name: '',
            phone: '',
            address: '',
            image: null,
            username: '',
            password: '',
            uploadFile: true,
            fillPassword: true,
        })
    }

    Edit = (selectedItem) => {
        $("#modal_customer").modal('show')
        this.setState({
            action: 'update',
            customer_id: selectedItem.customer_id,
            name: selectedItem.name,
            phone: selectedItem.phone,
            address: selectedItem.address,
            image: null,
            username: selectedItem.username,
            password: '',
            uploadFile: false,
            fillPassword: false,
        })
    }

    saveCustomer = (event) =>{
        event.preventDefault()
        $("#modal_customer").modal('show')
        let form = new FormData()
        form.append("customer_id", this.state.customer_id)
        form.append("name", this.state.name)
        form.append("phone", this.state.phone)
        form.append("address", this.state.address)
        form.append("username", this.state.username)
        if(this.state.uploadFile){
            form.append("image", this.state.image)
        }
        if(this.state.fillPassword){
            form.append("password", this.state.password)
        }
        let url = base_url + "/customer"
        if (this.state.action === "insert"){
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getCustomers()
            })
            .catch(error => console.log(error))
        }else if(this.state.action ==="update"){
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getCustomers()
            })
            .catch(error => console.log(error))
        }
    }

    dropCustomer = (selectedItem) => {
        if(window.confirm("Are you sure will delete this item?") ){
            let url = base_url + "/customer/" + selectedItem.customer_id
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getCustomers()
            })
            .catch(error => console.log(error))
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Customer List</h3>
                    <div className="row">
                        {this.state.customers.map(item => (
                            <CustomerList
                                key={item.customer_id}
                                name={item.name}
                                phone={item.phone}
                                address={item.address}
                                image={customer_image_url + "/" + item.image}
                                onEdit={() => this.Edit(item)}
                                onDrop={() => this.dropCustomer(item)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Add Customer
                    </button>
                </div>
                {/* modal customer */}
                <div className="modal fade" id="modal_customer">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-hedaer bg-info text-white">
                                <h4>Form Customer</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveCustomer(ev)}>
                                    Customer Name
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.name}
                                        onChange={ev => this.setState({ name: ev.target.value })}
                                        required>
                                    </input>
                                    Customer Phone
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.phone}
                                        onChange={ev => this.setState({ phone: ev.target.value })}
                                        required>
                                    </input>
                                    Customer Address
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.address}
                                        onChange={ev => this.setState({ address: ev.target.value })}
                                        required>
                                    </input>
                                    Customer Username
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({ username: ev.target.value })}
                                        required>
                                    </input>

                                    {this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                        onClick={() => this.setState({uploadFile: true})}>
                                            Change Product Image
                                        </button>
                                    ) :  (
                                        <div>
                                            Product Image
                                            <input type="file" className="form-control mb-1"
                                            onChange={ev => this.setState({image: ev.target.files[0]})}
                                            required></input>
                                        </div>
                                    )}

                                    {this.state.action === "update" && this.state.fillPassword === false ? (
                                        <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                            onClick={() => this.setState({ fillPassword: true })}>
                                            Change Password
                                        </button>
                                    ) : (
                                            <div>
                                                Password
                                                <input type="password" className="form-control mb-1"
                                                    value={this.state.password}
                                                    onChange={ev => this.setState({ password: ev.target.value })}
                                                    required>
                                                </input>
                                            </div>
                                        )}
                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                        </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}