const URL_BASE = "http://localhost:3000";

const converterStringParaData = (dataString) => {
  const [ano, mes, dia] = dataString.split("-");
  return new Date(Date.UTC(ano, mes - 1, dia));
};

const api = {
  async buscarPensamentos() {
    try {
      const response = await axios.get(`${URL_BASE}/pensamentos`);
      const pensamentos = await response.data;

      return pensamentos.map((pensamento) => {
        return {
          ...pensamento,
          data: new Date(pensamento.data),
        };
      });
    } catch (error) {
      alert("Erro ao buscar pensamentos");
      throw error;
    }
  },

  async SalvarPensamento(pensamento) {
    try {
      const data = converterStringParaData(pensamento.data);
      const response = await axios.post(`${URL_BASE}/pensamentos`, {
        ...pensamento,
        data: data.toISOString(),
      });
      return await response.data;
      // const response = await fetch(`${URL_BASE}/pensamentos`, {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(pensamento)
      // })
      // return await response.json()
    } catch (error) {
      alert("Erro ao buscar pensamentos");
      throw error;
    }
  },

  async buscarPensamentoPorId(id) {
    try {
      const response = await axios.get(`${URL_BASE}/pensamentos/${id}`);
      const pensamento = await response.data;

      return {
        ...pensamento,
        data: new Date(pensamento.data),
      };
    } catch {
      alert("Erro ao buscar Pensamento");
      throw error;
    }
  },
  async editarPensamento(pensamento) {
    try {
      const response = await axios.put(
        `${URL_BASE}/pensamentos/${pensamento.id}`,
        pensamento
      );
      return await response.data;
      // const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
      //     method: "PUT",
      //     headers: {
      //         "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(pensamento)
      // })
      // return await response.json()
    } catch (error) {
      alert("Erro ao editar pensamentos");
      throw error;
    }
  },
  async excluirPensamento(id) {
    try {
      const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`);
      // const response = await fetch(`${URL_BASE}/pensamentos/${id}`, {
      //     method: "DELETE",
      // })
    } catch (error) {
      alert("Erro ao excluir um pensamento");
      throw error;
    }
  },
  async buscarPensamentoPorTermo(termo) {
    try {
      const pensamento = await this.buscarPensamentos();
      const termoEmMinusculas = termo.toLowerCase();
      const pensamentosFiltrados = pensamento.filter((pensamento) => {
        return (
          pensamento.conteudo.toLowerCase().includes(termoEmMinusculas) ||
          pensamento.autoria.toLowerCase().includes(termoEmMinusculas)
        );
      });
      return pensamentosFiltrados;
    } catch (error) {
      alert("Erro ao filtrar pensamentos");
      throw error;
    }
  },
  async atualizarFavorito(id, favorito) {
    try {
      const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, {
        favorito,
      });
      return response.data;
    } catch (error) {
      alert("Erro ao atualizar favorito");
      throw error;
    }
  },
};

export default api;
