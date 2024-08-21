export class URLUtils {
  static getLastPath(urlString: string): string {
    try {      
      const paths = urlString?.split('/');

      // Remove quaisquer elementos vazios do array resultante
      const filteredPaths = paths.filter((path) => path.length > 0);

      return filteredPaths.pop() || ''; // Retorna a última parte ou uma string vazia se não houver nenhuma
    } catch (error) {      
      return '';
    }
  }
}
