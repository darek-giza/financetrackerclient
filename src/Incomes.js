import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import TextField from '@material-ui/core/TextField';
import {Button, Container} from '@material-ui/core';
import MaterialUIPickers from "./MaterialUIPickers"
import moment from "moment"


const useStyles = makeStyles(theme=>({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: 200,
        },
    },
    table: {
      minWidth: 650,
    },
    button: {
        margin: theme.spacing(2),
    },
    cont: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
  }));

class Incomes extends Component {

    emptyIncome={
        description: null,
        amount: null,
        date: new Date()
    };

    constructor(props) {
        super(props);
            this.state={
                incomes: [],
                isLoaded: false,
                incomes: this.emptyIncome
                }
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleDateChange = this.handleDateChange.bind(this);
            this.getIncomes = this.getIncomes.bind(this);
        }
    getIncomes = async()=>{
        const incomes = await request('http://localhost:8080/api/incomes');
        this.setState({
                    isLoaded: true,
                    incomes: incomes,
                });                     
    }

    async componentDidMount(){this.getIncomes();
    }

    handleSubmit = async(event)=>{
        try{
            event.preventDefault();
            let income = this.state.income;
            income.date = moment(income.date).format("YYYY-MM-DD");
            await request('http://localhost:8080/api/incomes',{
                method: 'POST',
                body: JSON.stringify([income])
            })
            this.getIncomes();
            this.cancelIncomes();
        }catch(error){
            console.log("Adding income failed",error)
        }

    };


    handleChange(event){
        const target = event.target;
        const value  = target.value;
        const name = target.name;
        let income ={...this.state.income};
        income[name] = value;
        this.setState({income});
        }

    handleDateChange(date){
        let income={...this.state.income};
        income.date = date;
        this.setState({income});

    }

    cancelIncomes = () =>document.getElementById("create-income-form").reset();

    render(){
        var {isLoaded, incomes} = this.state;

        const {classes} = this.props;
   
        if(!isLoaded){
            return <div>Loading ...</div>
        }else {

        return( 
            <React.Fragment>
                <MenuAppBar/>

                <Container className={classes.cont} maxWidth="sm">
                        <form className={classes.root} noValidate autoComplete="off" id="create-income-form"
                                onSubmit={this.handleSubmit}>
                            <div><h4>Add a new income ...</h4></div>
                            <TextField type="text" id="description" label="Description" onChange={this.handleChange} name="description"/>
                            <div>
                            <TextField type="text" id="amount" label="Amount" onChange={this.handleChange} name="amount"/></div>  
                            <div>
                            <MaterialUIPickers selected={this.state.incomes.date} onChange={this.handleDateChange} id="date" name="date"/></div>
                        </form>
                         <Button color="primary" variant="outlined" size="small" className={classes.button}
                                 onClick={this.handleSubmit} type="submit">Save</Button>{' '}
                         <Button color="secondary" variant="outlined" size="small" className={classes.button}
                                 onClick={this.cancelExpense}>Cancel</Button>
                    </Container>

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

export default withStyles(useStyles)(Incomes)
