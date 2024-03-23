// MODULES
import { StyleSheet, View } from 'react-native';

const Pagination = ({ steps, active }) => {

    return (
        <View style={styles.container}>
            
            {steps.map(({color}, index) => {
            
                return (
                    <View 
                        key={index} 
                        style={[
                            styles.pagination, 
                            index === active ? styles.activePagination : null, 
                            index === 0 ? styles.firstPagination : null
                        , {backgroundColor: steps[active].color}]}
                    >
                    </View>   
                )
            })}
        </View>
    )
}

export default Pagination;

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        flexDirection: 'row'
    },  
    pagination: {
        width: 20,
        height: 20,
        marginLeft: 20,
        borderRadius: 3,
        backgroundColor: '#FFF'
    },
    firstPagination: { marginLeft: 0 },
    activePagination: { width: 80 }
});