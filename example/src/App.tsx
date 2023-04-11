import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View, Text } from 'react-native';

import {
  Layout,
  InputTypes,
  Header,
  SizeScheme,
  Takoz,
  ButtonIcon,
  ButtonText,
  Dictionary,
  Calendar,
  Input,
  Modal
} from 'react-native-pieces';
import {faFloppyDisk, faEnvelope, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

const INFO = [
    { key: 'Born', value: 'September 9, 1941[1][2][3][4] Bronxville, New York, U.S.' },
    { key: 'Died', value: 'c. October 12, 2011 (aged 70) Berkeley Heights, New Jersey, U.S.' },
    { key: 'Alma mater', value: 'Harvard University' },
    { key: 'Known for', value: 'ALTRAN B BCPL C Multics Unix' },
    { key: 'Institutions known for me', value: 'Lucent Technologies Bell Labs' },
    { key: 'Website', value: 'bell-labs.com/usr/dmr/www/' }
];

const INFO2 = [
    { key: 'Task Name', value: 'Test task' },
    { key: 'Start Date', value: '2023-04-04' },
    { key: 'Success Percentage', value: '0.00%' },
    { key: 'Remaining Days', value: '34' }
];

const cities = ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Kocaeli', 'Sakarya', 'Balikesir', 'Duzce', 'Edirne'];


export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [halfModalVisible, setHalfModalVisible] = useState(false);
    const [form, setForm] = useState([
        { value: [''], type: InputTypes.TEXT, label: 'Name' },
        { value: [''], type: InputTypes.NUMBER, label: 'Weight' },
        { value: [''], type: InputTypes.DATE, label: 'Birth Date' },
        { value: [], type: InputTypes.SINGLE, label: 'City Live In', options: cities },
        { value: [], type: InputTypes.MULTI, label: 'Favourite Cities', options: cities },

    ]);

    return (
        <Layout>
            <Header
                navigation={{
                    getState: () => {
                        return {
                            routes: []
                        }
                    }
                } as any}
                title='An App'
                buttons={[
                    {faIcon: faEnvelope, handleClick:()=>{console.log('faEnvelope')}},
                    {faIcon: faInfoCircle, handleClick:()=>{console.log('faInfoCircle')}}
                ]}
            />

            <Text style={{ fontSize: SizeScheme.get().font.a }}>HELLO</Text>
            <Text style={{ fontSize: SizeScheme.get().font.b }}>HELLO</Text>
            <Text style={{ fontSize: SizeScheme.get().font.c }}>HELLO</Text>
            <Text style={{ fontSize: SizeScheme.get().font.d }}>HELLO</Text>
            <Text style={{ fontSize: SizeScheme.get().font.e }}>HELLO</Text>
            <Text style={{ fontSize: SizeScheme.get().font.f }}>HELLO</Text>
            <Takoz />

            <ButtonIcon
                faIcon={faFloppyDisk}
                handleClick={() => {
                    console.log('ButtonIcon clicked');
                }} />
            <Takoz />

            <ButtonText
                label='Submit'
                handleClick={() => {
                    console.log('ButtonText clicked');
                }} />
            <Takoz />

            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <ButtonText
                    label='Submit'
                    style={{
                        maxWidth: '50%',
                        marginLeft: 'auto'
                    }}
                    handleClick={() => {
                        console.log('ButtonText clicked');
                    }} />
                <Takoz />
                <ButtonText
                    label='Submit'
                    style={{
                        maxWidth: '50%'
                    }}
                    handleClick={() => {
                        console.log('ButtonText clicked');
                    }} />
            </View>
            <Takoz />

            <Dictionary
                data={INFO} />
            <Takoz />
            <Dictionary
                data={INFO2} />
            <Takoz />

            <ButtonText
                label='Open Modal'
                handleClick={() => {
                    setModalVisible(true);
                }} />
            <Takoz />

            <ButtonText
                label='Open Half Modal'
                handleClick={() => {
                    setHalfModalVisible(true);
                }} />
            <Takoz />

            <Calendar
                targetDate={new Date()} />
            <Takoz />

            {
                form.map((e, i) => (
                    <Input
                        key={`form-item-${i}`}
                        handleChange={(val, _) => {
                            const tForm = [...form];
                            tForm[i].value = val;
                            setForm(tForm);
                        }}
                        label={e.label}
                        type={e.type}
                        value={e.value}
                        options={e.options} />
                ))
            }

            <Takoz height={400} />

            <Modal
                visible={modalVisible}
                handleClose={() => {
                    setModalVisible(false);
                }}>
                <Text>Hello from modal</Text>
            </Modal>

            <Modal
                visible={halfModalVisible}
                style={{
                    height: 500
                }}
                handleClose={() => {
                    setHalfModalVisible(false);
                }}>
                <Text>Hello from half modal</Text>
            </Modal>

        </Layout>
    );
}