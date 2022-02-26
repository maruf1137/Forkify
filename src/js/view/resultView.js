import View from './View';
import previewView from './previewView';
import icons from '../../img/icons.svg';

class resultView extends View {
  _parentElement = document.querySelector('.results');
  _errormMessage = 'no recipes found for your query, please try again :)';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultView();
