import { navigateToHome } from '@/app/nav/utils';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import BreadcrumbContainer from './BreadCrumbContainer';
import GlobalStyles from '@/app/GlobalStyles';

const BreadCrumbCanteen = () => {
    return (
        <BreadcrumbContainer>
            <TouchableOpacity onPress={navigateToHome}>
                <Text style={GlobalStyles.breadcrumbItem}>Home</Text>
            </TouchableOpacity>
            <Text style={GlobalStyles.breadcrumbSeparator}>/</Text>
            <Text style={[GlobalStyles.breadcrumbItem, GlobalStyles.breadcrumbActive]}>
                Mensa
            </Text>
        </BreadcrumbContainer>
    )
}

export default BreadCrumbCanteen;