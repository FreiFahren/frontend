export function highlightElement(id: string) {
    const element = document.getElementById(id);
    
    if (element) {
      element.classList.add('highlight');
      setTimeout(() => {
        element.classList.remove('highlight');
      }, 3000);
    }

}