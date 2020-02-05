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


class User extends Component{

    constructor(props) {
        super();
        this.state={
            user: [],
            isLoaded: false,
        }
    }

    

//  http://loclhost:8080/api/user
//  should download current user when he is loged in

    async componentDidMount(){
            const response = await fetch('http://localhost:8080/api/users/2');
            const user = await response.json();
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

                    <h1>User data</h1>
                
                 
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >#</TableCell>
                            <TableCell >User Name</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >Balance</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                                <TableRow key={user.id}>
                                    <TableCell component="th" > {user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.budget.balance}</TableCell>
                                    <TableCell width="15%">
                                            <Button variant="outlined" size="large">Edit</Button>
                                    </TableCell>
                                   
                                </TableRow>
                    </TableBody>
                </Table>
                </TableContainer>
                <TableContainer>
                    <h3>List of amounts of your recent incomes</h3>
                <Table>
                    <TableBody>
                                  <TableCell>
                                    >>
                                    (
                                    {user.budget.incomes.map((income) => income.amount).join(', ')}
                                    )
                                    </TableCell>
                                    <TableCell width="15%">
                                                 <Button variant="outlined" color="primary" href="/incomes">Go to details ...</Button>
                                    </TableCell>
                    </TableBody>
                </Table>
                </TableContainer>
                <TableContainer>
                    <h3>List of amounts of your recent expenses</h3>
                <Table>
                    <TableBody>
                                    <TableCell>
                                        >>
                                        (
                                        {user.budget.expense.map((expense) => expense.amount).join(', ')}
                                        )
                                    </TableCell>
                                    <TableCell width="15%">
                                              <Button variant="outlined" color="primary" href="/expenses">Go to details ...</Button>
                                    </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
            </React.Fragment>    
        )}}

}

export default User
