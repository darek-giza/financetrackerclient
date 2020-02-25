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
import {request} from './request';
import TextField from '@material-ui/core/TextField';
import {Button, Container} from '@material-ui/core';


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

class Types extends Component {

    emptyType={
        description: null,
    };

    constructor(props) {
        super(props);
            this.state={
                types : [],
                isLoaded: false,
                type: this.emptyType
                }
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.getTypes = this.getTypes.bind(this);
        }
    getTypes = async()=>{
        const types = await request('http://localhost:8080/api/type');
        this.setState({
                    isLoaded: true,
                    types : types,
                });                     
    }

    async componentDidMount(){this.getTypes();
    }

    handleSubmit = async(event)=>{
        try{
            event.preventDefault();
            let types = this.state.types;
            await request('http://localhost:8080/api/type',{
                method: 'POST',
                body: JSON.stringify(types)
            })
            this.getTypes();
            this.cancelTypes();
        }catch(error){
            console.log("Adding type failed",error)
        }

    };


    handleChange(event){
        const target = event.target;
        const value  = target.value;
        const name = target.name;
        let types ={...this.state.types};
        types[name] = value;
        this.setState({types});
        }

    cancelTypes = () =>document.getElementById("create-type-form").reset();

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
                        <form className={classes.root} noValidate autoComplete="off" id="create-type-form"
                                onSubmit={this.handleSubmit}>
                                <div><h4>Add a new type ...</h4></div>
                                <TextField type="text" id="description" label="Description" onChange={this.handleChange} name="description"/>
                        </form>
                                <Button color="primary" variant="outlined" size="small" className={classes.button}
                                        onClick={this.handleSubmit} type="submit">Save</Button>{' '}
                                <Button color="secondary" variant="outlined" size="small" className={classes.button}
                                        onClick={this.cancelTypes}>Cancel</Button>
                </Container>

             <h1>Statement of all expense types</h1>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Id</TableCell>
                                <TableCell >Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                               {this.state.types.map(type =>{
                                    return(
                                        <TableRow key={type.id}>
                                            <TableCell>{type.id}</TableCell>
                                            <TableCell>{type.description}</TableCell>
                                        </TableRow>
                                    )})}
                        </TableBody>
                    </Table>
                </TableContainer>
            <StickyFooter/>  
        </React.Fragment>  
        )}}

}
    

export default withStyles(useStyles)(Types)