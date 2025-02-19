import { navigateToCanteen, navigateToHome, navigateToMeal } from '@/app/nav/utils';
import { TouchableOpacity, Text } from 'react-native';
import BreadcrumbContainer from './BreadCrumbContainer';
import GlobalStyles from '@/app/GlobalStyles';

const BreadCrumbAddMeal = () => {
    return (
        <BreadcrumbContainer>
            <TouchableOpacity onPress={navigateToHome}>
                <Text style={GlobalStyles.breadcrumbItem}>Home</Text>
            </TouchableOpacity>
            <Text style={GlobalStyles.breadcrumbSeparator}>/</Text>
            <TouchableOpacity onPress={() => navigateToCanteen()}>
                <Text style={GlobalStyles.breadcrumbItem}>Mense</Text>
            </TouchableOpacity>
            <Text style={GlobalStyles.breadcrumbSeparator}>/</Text>
            <TouchableOpacity onPress={() => navigateToMeal()}>
                <Text style={GlobalStyles.breadcrumbItem}>Pasti</Text>
            </TouchableOpacity>
            <Text style={GlobalStyles.breadcrumbSeparator}>/</Text>
            <Text style={[GlobalStyles.breadcrumbItem, GlobalStyles.breadcrumbActive]}>
                Aggiungi Pasto
            </Text>
        </BreadcrumbContainer>
    )
}

export default BreadCrumbAddMeal;