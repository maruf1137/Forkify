
class searchview {
   _parentEl = document.querySelector('.search')

   getQuery(){
     const query = this._parentEl.querySelector('.search__field').value
     this._clearInput()
     return query
   }

   _clearInput(){
     return this._parentEl.querySelector('.search__field').value = ''
   }

   addHendler(hendler){
       this._parentEl.addEventListener('submit', function(e) {
          e.preventDefault()
          hendler()
       })
    }
}

export default new searchview()