import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { textStyleBase } from '../../../theme/styles';
import { withTheme } from '../../../theme/withTheme';
import { IExpense, IThemeConstants } from '../../../typings';
import { formatAmount, sum } from '../../../util';

export interface ISectionHeaderProps {
  section: {
    title: string;
    data: any[];
  };
  theme: IThemeConstants;
}

const SectionHeader = ({ section, theme }: ISectionHeaderProps) => (
  <View style={styles(theme).headerRowView}>
    <Text style={styles(theme).headerRowText}>
      {section.title}
    </Text>
    <Text style={styles(theme).headerAmountText}>
      {formatAmount(sum(section.data, (d: IExpense) => d.amount))}
    </Text>
  </View>
);

export default withTheme(SectionHeader);

const styles = (theme: IThemeConstants) => StyleSheet.create({
  headerRowView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.backgroundMainColor,
    paddingBottom: 3,
    paddingRight: 16,
    paddingTop: 15
  },
  headerRowText: {
    ...textStyleBase(theme),
    marginLeft: 23
  },
  headerAmountText: {
    ...textStyleBase(theme),
    flexGrow: 1,
    textAlign: 'right'
  }
});

