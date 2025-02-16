import { navigateToCanteen, navigateToHome } from '@/app/nav/utils';
import { TouchableOpacity, Text } from 'react-native';
import BreadcrumbContainer from './BreadCrumbContainer';
import GlobalStyles from '@/app/GlobalStyles';

const BreadCrumbDealyMeals = () => {
    return (
        <BreadcrumbContainer>
            <TouchableOpacity
                onPress={navigateToHome}
            >
                <Text style={GlobalStyles.breadcrumbItem}>Home</Text>
            </TouchableOpacity>
            <Text style={GlobalStyles.breadcrumbSeparator}>/</Text>
            <TouchableOpacity
                onPress={navigateToCanteen}
            >
                <Text style={GlobalStyles.breadcrumbItem}>Mensa</Text>
            </TouchableOpacity>
            <Text style={GlobalStyles.breadcrumbSeparator}>/</Text>
            <Text style={[GlobalStyles.breadcrumbItem, GlobalStyles.breadcrumbActive]}>Pasti</Text>
        </BreadcrumbContainer>
    )
}

export default BreadCrumbDealyMeals;