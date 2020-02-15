import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuAppBar from './Components/MenuAppBar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StickyFooter from './StickyFooter';
import Moment from 'react-moment';
import {request} from './request';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

class Incomes extends Component {
            constructor(props) {
                super();
                this.state={
                    incomes: [],
                    isLoaded: false,
                }
            }

            async componentDidMount(){
                const incomes = await request('http://localhost:8080/api/incomes');
                this.setState({
                            isLoaded: true,
                            incomes: incomes,
                        });                     
            }

    render(){
        var {isLoaded, incomes} = this.state;

        const {classes} = this.props;
   
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
                                     <TableCell >Date</TableCell>
                                    <TableCell >Description</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.incomes.map(incomes =>{
                                    return(
                                        <TableRow key={incomes.id}>
                                            <TableCell><Moment format="DD-MM-YYYY">{incomes.date}</Moment></TableCell>
                                            <TableCell>{incomes.description}</TableCell>
                                            <TableCell align="right">{incomes.amount}</TableCell>
                                        </TableRow>
                                    )})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                <StickyFooter/>  
            </React.Fragment>  
        )}}

}

export default Incomes
