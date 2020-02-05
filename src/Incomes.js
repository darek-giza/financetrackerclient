import React, { Component } from 'react';
import MenuAppBar from './Components/MenuAppBar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Incomes extends Component {

        constructor(props) {
                super();
                this.state={
                    incomes: [],
                    isLoaded: false,
                }
            }

            async componentDidMount(){
                const reponse = await fetch('http://localhost:8080/api/incomes');
                const incomes = await reponse.json();
                this.setState({
                            isLoaded: true,
                            incomes: incomes,
                        });
            }

    render(){
        var {isLoaded, incomes} = this.state;

        if(!isLoaded){
            return <div>Loading ...</div>
        }else {

        return(     
            <React.Fragment>
            
            <MenuAppBar/>

                    <h1>Statement of all incomes</h1>
                
                 
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >#</TableCell>
                            <TableCell >Amount</TableCell>
                            <TableCell >Description</TableCell>
                            <TableCell >Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.incomes.map(incomes =>{
                            return(
                                <TableRow key={incomes.id}>
                                    <TableCell component="th" >{incomes.id}</TableCell>
                                    <TableCell>{incomes.amount}</TableCell>
                                    <TableCell>{incomes.description}</TableCell>
                                    <TableCell>{incomes.date}</TableCell>
                                </TableRow>
                            )})}
                    </TableBody>
                </Table>
            </TableContainer>
            </React.Fragment>    
        )}}

}

export default Incomes
