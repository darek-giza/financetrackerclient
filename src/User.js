import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuAppBar from './Components/MenuAppBar'
import Button  from '@material-ui/core/Button';
import StickyFooter from './StickyFooter';
import {request} from './request';
import Grid from "@material-ui/core/Grid";


class User extends Component{

    constructor(props) {
        super();
        this.state={
            user: [],
            isLoaded: false,
        }
    }

    async componentDidMount(){
            const user = await request('http://localhost:8080/api/user');
            this.setState({
                isLoaded: true,
                user: user,
            });
        }

        

    render(){
        var {isLoaded, user} = this.state;

        if(!isLoaded){
            return <div>Loading ...</div>
        }else {

        return(     
            <React.Fragment>
            
            <MenuAppBar/>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <h1>User data</h1>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Name</TableCell>
                                        <TableCell >Email</TableCell>
                                        <TableCell >Balance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.budget.balance}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Button variant="outlined" size="large">Edit</Button>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TableContainer>
                            <h4>List of amounts of your recent expenses</h4>
                            <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width="5%">Type of expense</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>
                                                <Button variant="outlined" color="primary" href="/expenses">details</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user.budget.expense.map(e=>{
                                            return(
                                                <TableRow key={e.id}>
                                                    <TableCell>{e.expenseType.description} </TableCell>
                                                    <TableCell>{e.amount} </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TableContainer>
                            <h4>List of amounts of your recent incomes</h4>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell width="5%">
                                            <Button variant="outlined" color="primary" href="/incomes">details</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.budget.incomes.map(i=>{
                                        return(
                                            <TableRow key={i.id}>
                                                <TableCell>{i.description}</TableCell>
                                                <TableCell>{i.amount} </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            <StickyFooter/>
            </React.Fragment>    
        )}}

}

export default User
