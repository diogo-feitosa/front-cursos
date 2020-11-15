import { http } from './config'

export default	{

	salvar:(curso)=>{
		return http.post('curso',curso);
  },
    
	atualizar:(curso)=>{
		return http.put('curso',curso);
  },

  listar:()=>{
		return http.get('cursos')
  },
    
	apagar:(curso)=>{
		return http.delete('curso', { data: curso })
	}
}