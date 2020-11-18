// Instância Vue (componente pai)
const vm = new Vue({
    el: '#app',
    data: { 
        grade:'',
        sortFlag: -1,
        frm: {
            student:'',
            discipline:'',
            grade:'',
            edit : {
                id:'',
                grade:''
            },
            filter: {
                student:'',
                discipline:''
             }
        },
        students: [],
        disciplines: [],
        grades: []
    },
    methods: {
        // gera um novo ID para o array grades
        getNextId() {
            if (this.grades.length == 0) {
                return 1
            } else {
                return this.grades[this.grades.length - 1].id + 1
            }
        },
        // Adicionar nota do estudante a uma disciplina
        addGrade() {
            const newGrade = {
                id: this.getNextId(),
                student: this.frm.student, 
                discipline: this.frm.discipline,
                grade: this.frm.grade
            }
            if (!this.grades.some(grade => 
                    grade.student == this.frm.student && 
                    grade.discipline == this.frm.discipline)) {
                this.grades.push(newGrade)
            } else {
                alert('Nota já publicada para esse estudante e disciplina!')
            }            
        },
        // Preparar a atualização de uma nota existente
        editGrade(id) {
            // Abrir janela modal
            document.querySelector('#dlgUpdateGrade').showModal()

            // Guardar o id da nota  ser atualizada
            const editGrade = this.grades.find(grade => grade.id === id)
            this.frm.edit.id = editGrade.id
            this.frm.edit.grade = editGrade.grade
        },
        // Atualizar uma nota existente
        updateGrade() {
            // Fechar janela modal
            document.querySelector('#dlgUpdateGrade').close()
            // Atualizar a nota
            this.grades.map(
                grade => {
                    if(grade.id === this.frm.edit.id) {
                        grade.grade = this.frm.edit.grade
                    }
                }
            )
        },
        // Remover uma determinada nota
        removeGrade(id) {
            if (confirm('Deseja mesmo remover a nota?')) {
                this.grades = this.grades.filter(
                    grade => grade.id !== id
                )
            }
        },
        showGrade(grade) {
            this.grade = grade
        },

        getStudentNameById(id) {
            return this.students.find(
                student => student.id === id
            ).name
        },
        getDisciplineNameById(id) {
            return this.disciplines.find(
                discipline => discipline.id === id
            ).name
        },
        sortGrades() {
            this.sortFlag = this.sortFlag * -1 
            this.grades = this.grades.sort(this.compareGrades)
        },

        compareGrades(a, b) {
            if(a.grade > b.grade) return 1 * this.sortFlag
            if(a.grade < b.grade) return -1 * this.sortFlag
            if(a.grade == b.grade) return 0
        }

     },
    computed: {
        getFilteredGrades() {
            return this.grades.filter(
                grade => 
                    (this.frm.filter.student==='' || grade.student === this.frm.filter.student)
                    &&
                    (this.frm.filter.discipline==='' || grade.discipline === this.frm.filter.discipline)
            )
        }
     },
    created() { 
        this.students.push(
            { id: 1, name: "João Silva" },
            { id: 2, name: "Maria Bastos" },
            { id: 3, name: "Ana Correia" },
            { id: 4, name: "Pedro Marques" },
            { id: 5, name: "Rute Castro" }
        )
        this.disciplines.push(
            { id: 1, name: "Algoritmia" },
            { id: 2, name: "Programação Orientada a Objetos" },
            { id: 3, name: "Programação Web 1" },
            { id: 4, name: "Programação Web 2" },
            { id: 5, name: "Computação Móvel e Ubíqua" }
        )
    }
})