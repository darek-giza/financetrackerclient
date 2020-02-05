import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuAppBar from './Components/MenuAppBar'


class Expenses extends Component{

    constructor(props) {
        super();
        this.state={
            data: [],
            isLoaded: false,
        }
    }

    async componentDidMount(){
        const respons = await fetch('http://localhost:8080/api/expenses');
        const data = await respons.json();
        this.setState({
                    isLoaded: true,
                    data: data,
                });
            }

    render(){
        var {isLoaded, data} = this.state;

        if(!isLoaded){
            return <div>Loading ...</div>
        }else {

        return(     
            <React.Fragment>
            
                       <MenuAppBar/>

                       <h1>Statement of all expenses</h1>
                
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >#</TableCell>
                            <TableCell >Type of expenses</TableCell>
                            <TableCell >Amount</TableCell>
                            <TableCell >Description</TableCell>
                            <TableCell >Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(expense =>{
                            return(
                                <TableRow key={expense.id}>
                                    <TableCell component="th" > {expense.id}</TableCell>
                                    <TableCell>{expense.expensesType}</TableCell>
                                    <TableCell>{expense.amount}</TableCell>
                                    <TableCell>{expense.description}</TableCell>
                                    <TableCell>{expense.date}</TableCell>
                                </TableRow>
                            )})}
                    </TableBody>
                </Table>
            </TableContainer>
            </React.Fragment>    
        )}}

}

export default Expenses
