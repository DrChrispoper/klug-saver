import { connect } from 'react-redux';
import { closeDeleteModal, deleteExpense } from '../../actions';
import { MODALS } from '../../constants/common';
import { IExpense, IMainState } from '../../typings';
import DeleteModal from './DeleteModal';


interface IStateProps {
  open: boolean;
  expense?: IExpense;
}

interface IDispatchProps {
  onClose?: () => void;
  onDelete?: (id: string, from: Date) => void;
}

const mapStateToProps = (state: IMainState): IStateProps => {
  return {
    open: state.openModal === MODALS.DELETE,
    expense: state.expenseToDelete
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  onClose: () => dispatch(closeDeleteModal),
  onDelete: (id: string, from: Date) => dispatch(deleteExpense(id))
});

export default connect<IStateProps, IDispatchProps, {}, IMainState>(mapStateToProps, mapDispatchToProps)(DeleteModal);
