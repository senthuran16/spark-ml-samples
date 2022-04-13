/* eslint-disable no-eval */

import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import { teal } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

import CustomPieChart from './components/CustomPieChart';
import { predictUrl } from './config';

const useStyles = () => ({
    root: {
        flexGrow: 1
    }
});

const theme = createTheme({
    palette: {
        primary: {
            main: teal[500]
        }
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInput: '',
            showChart: false,
            genre: '',
            chartData: '',
            resultAreaContent: 'INSTRUCTIONS'
        };
        this.onButtonClick = this.onButtonClick.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    handleTextInput = (e) => {
        this.setState({
            textInput: e.target.value
        });
    };

    onButtonClick = async () => {
        if (this.state.textInput) {
            this.setState({
                resultAreaContent: 'LOADING'
            });
            await axios
                .post(predictUrl, this.state.textInput, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                .then((response) => {
                    if (response && response.data) {
                        const genre = response.data.genre;
                        this.setState({
                            showChart: true,
                            genre: genre,
                            chartData: [
                                { name: 'Soul', value: response.data.soulProbability },
                                { name: 'Pop', value: response.data.popProbability },
                                { name: 'Country', value: response.data.countryProbability },
                                { name: 'Blues', value: response.data.bluesProbability },
                                { name: 'Jazz', value: response.data.jazzProbability },
                                { name: 'Reggae', value: response.data.reggaeProbability },
                                { name: 'Rock', value: response.data.rockProbability },
                                { name: 'Hip Hop', value: response.data.hiphopProbability }
                            ],
                            resultAreaContent: 'RESULT'
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error occurred while getting the prediction', error);
                });
        } else {
            alert('Empty string provided!');
        }
    };

    getResultAreaContent(resultAreaContentType) {
        switch (resultAreaContentType) {
            case 'RESULT':
                return (
                    <div>
                        <Card style={{ height: 800 }}>
                            <div style={{ padding: 40, paddingBottom: 0, marginBottom: 0 }}>
                                <center>
                                    <Typography variant='h6'>Predicted Genre:</Typography>
                                    <Typography variant='h2' color='primary'>
                                        {this.state.genre}
                                    </Typography>
                                </center>
                            </div>
                            <div>
                                <center>
                                    <CustomPieChart chartData={this.state.chartData} />
                                </center>
                            </div>
                        </Card>
                    </div>
                );
            case 'LOADING':
                return (
                    <div>
                        <Card style={{ padding: 20, height: 800 }}>
                            <center>
                                <CircularProgress />
                                <Typography>{`Predicting`}</Typography>
                            </center>
                        </Card>
                    </div>
                );
            default:
                return (
                    <div>
                        <Card style={{ padding: 20, height: 800 }}>
                            <center>
                                <Typography>{`Provide the lyrics and click on Predict to continue`}</Typography>
                            </center>
                        </Card>
                    </div>
                );
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div style={{ flexGrow: 1 }}>
                    <Grid container spacing={3} justifyContent='center' alignItems='center'>
                        <Grid item xs={12}>
                            <Typography variant='h3'>
                                <center>Genre Predictor</center>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ padding: 20 }}>
                                <center>
                                    <TextField
                                        label='Song Lyrics'
                                        multiline
                                        rows={30}
                                        variant='outlined'
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        onChange={this.handleTextInput}
                                    />
                                    <br />
                                    <br />
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disabled={this.state.resultAreaContent === 'LOADING'}
                                        onClick={this.onButtonClick}
                                        style={{ height: 60 }}
                                    >
                                        Predict&nbsp;
                                        {this.state.resultAreaContent === 'LOADING' ? (
                                            <CircularProgress />
                                        ) : (
                                            <BubbleChartIcon />
                                        )}
                                    </Button>
                                </center>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            {this.getResultAreaContent(this.state.resultAreaContent)}
                        </Grid>
                    </Grid>
                </div>
            </ThemeProvider>
        );
    }
}

export default withStyles(useStyles)(App);
