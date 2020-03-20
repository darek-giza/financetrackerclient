import React, {Component} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MenuAppBar from './Components/MenuAppBar'
import Dashboard from './Dashboard/Dashboard'
import Paper from '@material-ui/core/Paper';
import StickyFooter from './StickyFooter';
import {request} from './request';
import TextField from '@material-ui/core/TextField';
import {Button, Container} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(10),
            width: 200,
        },
        flexGrow: 100,
    },
    button: {
        margin: theme.spacing(0),
    },
    cont: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    chip: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


class Types extends Component {

    emptyType={
        description: null,
    };

    constructor(props) {
        super(props);
            this.state={
                types: [],
                isLoaded: false,
                type: this.emptyType,
                description: ''
            };
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
            const { description } = this.state;
            await request('http://localhost:8080/api/type',{
                method: 'POST',
                body: JSON.stringify({ description })
            })
            this.getTypes();
            this.cancelTypes();
        }catch(error){
            console.log("Adding type failed",error)
        }

    };

    handleChange(event) {
        const target = event.target;

        this.setState({ [target.name]: target.value });
    }

    cancelTypes = () => document.getElementById("create-type-form").reset();

    render() {
        var {isLoaded, types} = this.state;

        const {classes} = this.props;

        if (!isLoaded) {
            return <div>Loading ...</div>
        } else {

            console.log(types);
            return (
                <React.Fragment>
                    {/*<MenuAppBar/>*/}
                    <Dashboard/>
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={3}>
                                <Paper className={classes.paper}>
                                    <Container className={classes.cont} maxWidth="sm">
                                        <form className={classes.root} noValidate autoComplete="off"
                                              id="create-type-form"
                                              onSubmit={this.handleSubmit}>
                                            <div><h4>Add a new type ...</h4></div>
                                            <div>
                                            <TextField type="text" id="description" label="Description"
                                                       onChange={this.handleChange} name="description"/></div>
                                        </form>
                                        <Button color="primary" variant="outlined" size="small"
                                                className={classes.button}
                                                onClick={this.handleSubmit} type="submit">Save</Button>{' '}
                                        <Button color="secondary" variant="outlined" size="small"
                                                className={classes.button}
                                                onClick={this.cancelTypes}>Cancel</Button>
                                    </Container>

                                </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <h4>All types of expenses you have</h4>
                                <Paper className={classes.paper}>
                                    <div className={classes.chip}>
                                        <Chip variant="outlined" color="secondary" size="small" label="Expenses types"/>
                                        {types.map(type => {
                                            return (
                                                <Chip
                                                    variant="outlined"
                                                    size="small"
                                                    icon={<FaceIcon/>}
                                                    label={type.description}
                                                    clickable
                                                    color="primary"
                                                    deleteIcon={<DoneIcon/>}
                                                />
                                            )
                                        })}
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    <StickyFooter/>
                </React.Fragment>


            )
        }
    }
}
export default withStyles(useStyles)(Types)