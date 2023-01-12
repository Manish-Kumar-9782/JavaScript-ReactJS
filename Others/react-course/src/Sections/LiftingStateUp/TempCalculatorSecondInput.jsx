import React from "react";
import TemperatureInput from "./TemperatureInput";
/** Index Number 2
 *
 *  in this section we will add another second input for fahrenheit, and Temperature
 * will be shared in b/w the both Temperature Input Celsius and Fahrenheit inputs. both
 * will be updated as soon as one is changed.
 * 
 * // In this we need two additional temperature conversion function. 
 * 
 * toCelsius: convert the temperature from fahrenheit to celsius.
 * toFahrenheit: convert the temperature from Celsius to Fahrenheit.
 *
 */

const BoilingVerdict = (props) => {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
};

// toCelsius Conversion function.
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

// toFahrenheit Conversion function.
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

/** Now we will make another function which will convert our number into the string.
 * This will also check that NaN value to so we can tackle them. it will first make the 
 * conversion and then make the value into the round value up to 3 decimal points.
 */

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);

    // if number is not NaN
    if (Number.isNaN(input)) {
        return ""; // return blank string.
    }

    // if number is not NaN then we will first convert 
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class TempCalculatorShared extends React.Component {
    constructor(props) {
        super(props);

        this.scale = {
            c: 'Celsius',
            f: 'Fahrenheit',
        }

        this.state = {
            temperature: '', // initially no temperature is set.
            scale: this.scale.c
        };

    }

    // Now we need to make two different kind of method to handle the
    // changes in the temperature.
    handleCelsiusChange(temperature) {
        this.setState({ scale: this.scale.c, temperature })
    }

    // Now handling the changes for fahrenheit
    handleFahrenheitChange(temperature) {
        this.setState({ scale: this.scale.f, temperature })
    }

    // Now we will make a render method for the component which will display the
    // input fields
    render() {

        const scale = this.state.scale;
        const temperature = this.state.temperature;

        // Now first we will convert the temperature for each input.

        // for celsius
        const celsius = scale === this.scale.c
            ? tryConvert(temperature, toCelsius) : temperature;

        // for fahrenheit 
        const fahrenheit = scale === this.scale.f
            ? tryConvert(temperature, toFahrenheit) : temperature;


        return (
            <div>
                <TemperatureInput
                    scale={this.scale.c}
                    temperature={celsius}
                    onTempChange={(el) => this.handleCelsiusChange(el)}
                />
                <TemperatureInput
                    scale={this.scale.f}
                    temperature={fahrenheit}
                    onTempChange={(el) => this.handleFahrenheitChange(el)}
                />
                <BoilingVerdict celsius={parseFloat(this.state.temperature)} />
            </div>
        );
    }
}

export default TempCalculatorShared;
