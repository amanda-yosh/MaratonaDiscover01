// quando uma funçao está dentro do objeto ela é chamada de método
// todo obj tem propriedades e funcionalidades
const Modal = {
    open() {
        // Abrir o modal
        // Adicionar a classe active no modal
        document
            .querySelector('.modal-overlay') // seletor, procura
            .classList // chama a lista de classes
            .add('active') // que tem essa funcionalidade, add a classe active / ativo
    },
    close() {
        // Fechar Modal
        // Remover a classe active do modal
        document //vai no documento
            .querySelector('.modal-overlay') //faz a pesquisa dentro desse doc
            .classList
            .remove('active')
    }
    // função toogle, liga ou deliga, pode substituir as funçoes acima
}

const transactions = [
    {
        description: 'Luz',
        amount: -500000, // quando tratamos dinheiro nao colocamos pontos virgulas e nem nada, usamos estratégias posteriores
        date: '23/01/2021',
    },
    {
        description: 'Website',
        amount: 50000,
        date: '23/01/2021',
    },
    {
        description: 'Internet',
        amount: 20000,
        date: '23/01/2021',
    },
    {
        description: 'App',
        amount: 200000,
        date: '23/01/2021',
    }
] // isto é um array, uma colecao, uma lista. do que? de objetos

const Transaction = {
    all: transactions, // adicionar transações, entao estou agrupando os transactions aqui dentro, atalho
    add(transaction){ // funcionalidade de adicionar uma transação
        Transaction.all.push(transaction) // push é uma funcionalidade atrelada a arrays, vai adicionar a todas as transações essa que eu vou puxar
        App.reload()
    },
    remove(index) {
        Transaction.all.splice(index, 1) // espera o numero do index, ou seja, a posição do array

        App.reload()
    },
    incomes() {
        let income = 0; // no começo não tenho nenhuma entrada
        // para cada transação
        Transaction.all.forEach(transaction => {
            // se for maior que zero
            if (transaction.amount > 0) {
                // somar a variavel e retornar
                income += transaction.amount;
            }
        }) 
        return income;
    },
    expenses() {
        let expense = 0; // no começo não tenho nenhuma saída
        // para cada transação
        Transaction.all.forEach(transaction => {
            // se for menor que zero
            if (transaction.amount < 0) {
                // somar a variavel e retornar
                expense += transaction.amount;
            }
        }) 
        return expense;
    },
    total() {
        // contabilizar entradas - saídas
        return Transaction.incomes() + Transaction.expenses();
    }
} // esse é um objeto

// substituir os dados do HTML com os dados do JS

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'), // vai buscar pelo id data-table o tbody

    // responsável por adicionar a transacao
    addTransaction(transaction, index) {
        const tr = document.createElement('tr') // cria a tr, o elemento
        tr.innerHTML = DOM.innerHTMLTransaction(transaction) // recebendo um html

        DOM.transactionsContainer.appendChild(tr) // pegando a variavel e adicionando a funcionalidade de appendChild

    },

    innerHTMLTransaction(transaction) {
        // variavel inteligente
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
        `

        return html // tirando as coisas de dentro da funçao, no caso, enviando para fora o html
    },

    // atualização dos valores dos cards
    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes()) //"Soma das entradas"
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses()) //"Soma das saídas"
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total()) //"Total"
    },

    clearTransactions()  {
        DOM.transactionsContainer.innerHTML = ""
    }
}

// coisas uteis, ex.: formatação da moeda
const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "" // sinal

        value = String(value).replace(/\D/g, "") // pega tudo que nao é numero e substitui por nada
        // funcionalidade de replace faz a troca, (o que será substituido, o que irá substituir)

        value = Number(value) / 100 // dividindo o numero por 100

        //funcionalidade (que localizacao do mundo vc esta, opções que tenho como objeto)
        value = value.toLocaleString("pt-BR",{
            style: "currency",
            currency: "BRL"
        })

        return signal + value // retorna o sinal mais o valor
    }
}

// aplicação com 2 funcionalidades
const App = {
    init() {

        Transaction.all.forEach(transaction => {
            // funcionalidade para objetos do tipo array
            // para cada elemento do array ele irá executar uma funcionalidade
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance() // chamando a atualização do display dos cards
        
    },
    reload() {
        DOM.clearTransactions() // limpo antes de iniciar novamente, assim não repito as informações
        App.init()
    }, // releitura das coisas
}

App.init()
