import React, { useState } from "react";
import { Transaction } from "../../../types";


interface FormProps {
    addTransaction: (transaction: Transaction) => void;
}

const Form: React.FC<FormProps> = ({ addTransaction }) => {

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<string | number>('');
    const [type, setType] = useState<'income' | 'expense'>('income');

    const handleSubmit = () => {
        if (description && amount) {
            const transaction: Transaction = {
                id: Date.now(),
                description,
                amount: Number(amount),
                type
            }

            addTransaction(transaction);
            setDescription('');
            setAmount('');
        }
    }
    return (
        <div>
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <button onClick={handleSubmit}>Add</button>
        </div>
    )
}

export default Form;