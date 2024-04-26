import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EducationContract from "../contracts/EducationContract.json";
import getWeb3 from "../utils/getWeb3";
import ipfs from '../ipfs';

function RecordDetails() {
    const [state, setState] = useState({
        ipfsHash: '',
        buffer: null,
        web3: null,
        accounts: null,
        contract: null,
        record_id: '',
        address: '',
        record_name: '',
        desc: '',
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
    });

    const { recordId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const web3 = await getWeb3();
                const accounts = await web3.eth.getAccounts();
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = EducationContract.networks[networkId];
                const instance = new web3.eth.Contract(
                    EducationContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );

                setState({ ...state, web3, accounts, contract: instance });
            } catch (error) {
                alert(`Failed to load web3, accounts, or contract. Check console for details.`);
                console.error(error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to ensure useEffect only runs once on component mount

    const captureFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            setState({ ...state, buffer: reader.result });
        };
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { accounts, contract, buffer } = state;
        try {
            const result = await ipfs.files.add(buffer);
            const receipt = await contract.methods.addReport(
                state.record_id,
                state.address,
                state.record_name,
                state.desc,
                state.timestamp,
                result[0].hash
            ).send({ from: accounts[0] });
            
            // Check if the transaction was successfully mined
            if (receipt.status) {
                console.log("Transaction successful!");
                // Add any additional logic here, such as updating UI or fetching records
            } else {
                console.error("Transaction failed.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h4 className="title-styled" style={{ marginTop: "40px", marginLeft: "235px", marginBottom: "25px" }}>Upload Education Reports</h4>
            <div className="container">
                <form onSubmit={onSubmit} id="donateForm" className="donate-form">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-group required">
                                <label htmlFor="record_id">Institute ID</label>
                                <input className="form-control" type="text" id="record_id" name="record_id" placeholder="Enter record id" value={state.record_id} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group required">
                                <label htmlFor="address">Student Address Key</label>
                                <input className="form-control" type="text" id="address" name="address" placeholder="Enter Student Address key" value={state.address} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="form-group required">
                                <label htmlFor="record_name">Record Name</label>
                                <input className="form-control" type="text" id="record_name" name="record_name" placeholder="Type record name." value={state.record_name} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="form-group required">
                                <label htmlFor="desc">Description</label>
                                <input className="form-control" type="text" id="desc" name="desc" placeholder="One line description" value={state.desc} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="form-group required">
                                <label htmlFor="file">Documents (upload in .png, .jpg, or .pdf format)</label>
                                <input className="form-control" type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={captureFile} />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group required">
                                <label htmlFor="timestamp">Timestamp</label>
                                <input value={state.timestamp} className="form-control" readOnly type="text" id="timestamp" name="timestamp" placeholder="2019-08-03 20:45" required />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="dropbtn1" style={{ marginTop: "10px" }}>Upload to Blockchain</button>
                </form>
            </div>
        </div>
    );
}

export default RecordDetails;
