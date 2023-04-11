import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SizeScheme from '../../utils/sizes';
import ColorScheme from '../../utils/colors';
import ButtonIcon from '../ButtonIcon';
import { IconDefinition, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Takoz from '../Takoz';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface HeaderProps {
    title: string
    navigation: NativeStackNavigationProp<any,any>
    buttons?: {
        faIcon: IconDefinition,
        handleClick: ()=>void
    }[]
}

const Header = (props: HeaderProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleCont}>
                {
                    (props.navigation.getState().routes.length > 1) ? (
                        <ButtonIcon
                            faIcon={faAngleLeft}
                            handleClick={props.navigation.goBack} />
                    ) : (
                        <Text style={styles.title}>{props.title}.</Text>
                    )
                }
            </View>
            <View style={styles.buttonsContainer}>
                {
                    props.buttons ? (
                        props.buttons.map((e, ix) => (
                            [
                                (<Takoz
                                    key={`btn-header-tkz-${ix}`} />),
                                (<ButtonIcon
                                    key={`btn-header-${ix}`}
                                    faIcon={e.faIcon}
                                    handleClick={e.handleClick}
                                />)
                            ]

                        )).flat()
                    ) :
                        (<></>)
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontSize: SizeScheme.get().font.a,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: ColorScheme.get().primary
    },
    buttonsContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default Header;
