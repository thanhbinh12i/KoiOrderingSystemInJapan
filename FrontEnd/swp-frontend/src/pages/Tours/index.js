
import SearchTour from '../../components/SearchTour';
import FormTour from './FormTour';
import TourList from './TourList';
import './TourTemplate.scss';

function Tour() {
      return (
            <>
                  <SearchTour />
                  <div className='tour-list'>
                        <TourList />
                  </div>
                  <div className='form-container'>
                        <FormTour />
                  </div>
            </>
      )
}
export default Tour;