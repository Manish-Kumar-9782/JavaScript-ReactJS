import FirstForm from "./Sections/Forms/FirstForm";
import { NameForm } from "./Sections/Forms/ControlledForm";
import EssayForm from "./Sections/Forms/EssayForm";
import OptionList from "./Sections/Forms/OptionList";
import MultiOptionList from "./Sections/Forms/MutliOptionList";
import MultiInputForm from "./Sections/Forms/MultiInputForm";
import React from 'react';

const FormApp = () => {
    return (
        <div>
            {/* ------------------------------------------------------------- */}
            <div className="form-block">
                <p className="heading">A Simple Form: </p>
                <FirstForm /> <br />
                <span>
                    Note: this form will reload the whole page on submit, <br />
                    default submit is not controlled in jsx.
                </span>
            </div>
            {/* ------------------------------------------------------------- */}
            <div className="form-block">
                <p className="heading">
                    A Controlled form with handling submit process.
                </p>
                <NameForm />
            </div>
            {/* ------------------------------------------------------------- */}
            <div className="form-block">
                <p className="heading">An Essay Form with Controlled States.</p>
                <EssayForm />
            </div>
            {/* ------------------------------------------------------------- */}
            <div className="form-block">
                <p className="heading">Select an Options from the OptionList</p>
                <OptionList />
            </div>
            {/* ------------------------------------------------------------- */}
            <div className="form-block">
                <p className="heading">Select Options from the MultiOptionList</p>
                <MultiOptionList />
            </div>
            {/* ------------------------------------------------------------- */}
            <div className="form-block">
                <p className="heading">Reservation Status</p>
                <MultiInputForm />
            </div>
            {/* ------------------------------------------------------------- */}
        </div>
    )
}

export default FormApp;
