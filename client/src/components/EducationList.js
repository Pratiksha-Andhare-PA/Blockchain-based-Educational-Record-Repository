import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";

import '../CSS/StudentList.css';

class EducationList extends Component {
    state = {
        web3: null,
        accounts: null,
        contract: null,
        details: []
    };

    componentDidMount = async () => {
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ web3, accounts, contract: instance }, this.fetchRecords);
        } catch (error) {
            alert('Failed to load web3, accounts, or contract. Check console for details.');
            console.error(error);
        }
    };

    fetchRecords = async () => {
        const { contract, accounts } = this.state;
        const response = await contract.methods.getAllrecordDetails(accounts[0]).call();
        this.setState({ details: response });
    };

    renderRecords = () => {
        const { details } = this.state;
        if (details.length === 0) {
            return <div className="error"><h3>No Records!</h3></div>;
        }

        return details.map((record, index) => (
            <div className="card" key={index}>
                <div className="row listItem">
                    <div className="col s3 black-text">
                        <h6>{record.record_id}</h6>
                    </div>
                    <div className="col s3 black-text">
                        <h6>{record.record_code}</h6>
                    </div>
                    <div className="col s3 black-text">
                        <h6>{record.description}</h6>
                    </div>
                    <div className="col s3 black-text">
                        <h6>{record.timestamp}</h6>
                    </div>
                </div>
                <Link to={`/educationUpdate/${record.record_id}`}>
                    <button type="button" className="dropbtn1">Update</button>
                </Link>
            </div>
        ));
    };

    render() {
        return (
            <div className="notes">
                {this.renderRecords()}
            </div>
        );
    }
}

export default EducationList;
