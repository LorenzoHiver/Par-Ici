import React, { useState, useEffect, memo } from 'react';
import styled from '@emotion/styled';
import './StepContainer.component.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'moment/locale/fr';

import { FlexColumn } from '../Commons/Flex.commons';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 58vh;
    background: #292945;
    border-radius: 15px;
`;

const ProgressBar = styled.div`
    display: flex;
    position: relative;
    position: absolute;
    justify-content: space-between;
    width: 60%;
    height: .8rem;
    border-radius: 10px;
    background: #f8f8f8;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% - 3rem);
`;

const Button = styled.button`
    position: absolute;
    left: ${(props) => props.left};
    top: 0;
    transform: translateY(-45%);
    color: #292945;
    font-weight: 600;
    width: 150px;
    height: 60px;
    border: none;
    border-radius: 10px;
    font-size: 1.2rem;
    cursor: pointer;
    outline: none;
`;

const ColorProgress = styled(ProgressBar)`
    background: ${props => props.progress === 3 ? "#A543F1" : "linear-gradient(90deg, #A543F1 7.69%, #4845EE 76.92%)"};
    top: 0;
    left: -2px;
    width: ${(props) => props.width + '%'};
    transform: translateX(0%);
    transition: width .6s ease;
`;

const H2 = styled.h2`
    margin: 2rem 0;
    font-size: 1.3rem;
    font-weight: 500;
    color: #f8f8f8;
`;

const InputDate = styled.input`
`;

const StepContainer = () => {

    const [progress, setProgress] = useState(3);
    const [step, setStep] = useState(1);
    const [date, setDate] = useState({});
    const [focusedInput, setFocusedInput] = useState(null);

    const BAD_DATES = [moment(), moment().add(5, 'days')];
    const isDayBlocked = day => BAD_DATES.filter(d => d.isSame(day, 'day')).length > 0;

    useEffect(() => {
        switch (progress) {
            case 3:
                setStep(1);
                break;
            case 35.75:
                setStep(2);
                break;
            case 68.5:
                setStep(3);
                break;
            case 101.25:
                setStep(4);
                break;
            default:
                break;
        }
    }, [progress])

    const handleWeekDays = (day) => {
        day._locale._weekdaysMin = ['DI', 'LU', 'MA', 'ME', 'JE', 'VE', 'SA'];
        return (day.format('D'));
    }

    return (
        <Container>
            <FlexColumn>
                <H2>ETAPE {step}</H2>
                <DateRangePicker
                    startDatePlaceholderText="Départ"
                    endDatePlaceholderText="Arrivé"
                    startDateId="startDate"
                    endDateId="endDate"
                    displayFormat={"DD-MM-YYYY"}
                    startDate={date.startDate}
                    endDate={date.endDate}
                    onDatesChange={({ startDate, endDate }) => setDate({ startDate, endDate })}
                    focusedInput={focusedInput}
                    onFocusChange={(focusedInput) => { setFocusedInput(focusedInput) }}
                    renderMonthElement={({ month }) => moment(month).locale('fr').format('MMMM YYYY')}
                    renderDayContents={(day) => handleWeekDays(day)}
                    isDayBlocked={isDayBlocked}
                />
            </FlexColumn>
            <ProgressBar>
                <Button disabled={progress === 3 && true} onClick={() => setProgress((value) => value - 32.75)} left={'-25%'}>Précédent</Button>
                <ColorProgress progress={progress} width={progress} />
                <Button onClick={() => setProgress((value) => value + 32.75)} left={'106%'}>{progress === 101.25 ? "Terminer" : "Suivant"}</Button>
            </ProgressBar>
        </Container>
    )
}

export default memo(StepContainer);