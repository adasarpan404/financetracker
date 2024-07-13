import { Transaction } from "../../../types";
import styles from '../../styles/Home.module.css';

interface DataTableProps {
    transactions: Transaction[];
    removeTransaction: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ transactions, removeTransaction }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction.id}>
                        <td>{transaction.description}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.type}</td>
                        <td>
                            <button onClick={() => removeTransaction(transaction.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
