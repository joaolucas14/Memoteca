const URL_BASE = "http://localhost:3000"

const api = {
    async buscarPensamentos(){
        try{
            const response = await fetch(`${URL_BASE}/pensamentos`)
            return await response.json()
        }
        catch(error){
            alert('Erro ao buscar pensamentos')
            throw error
        }
    },

    async SalvarPensamento(pensamento){
        try{
            const response = await fetch(`${URL_BASE}/pensamentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json()
        }
        catch(error){
            alert('Erro ao buscar pensamentos')
            throw error
        }
    },

    async buscarPensamentoPorId(id){
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`)
            return await response.json()
        } catch {
            alert("Erro ao buscar Pensamento")
            throw error
        }
    },
    async editarPensamento(pensamento){
        try{
            const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json()
        }
        catch(error){
            alert('Erro ao editar pensamentos')
            throw error
        }
    },
    async excluirPensamento(id){
        try{
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`, {
                method: "DELETE",
            })
        }
        catch(error){
            alert('Erro ao excluir um pensamento')
            throw error
        }
    }
}

export default api;