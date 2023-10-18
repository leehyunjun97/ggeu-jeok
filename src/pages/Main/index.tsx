import styles from './style/main.module.css';
import FriendsList from '../../components/common/Section/FriendsListUl/FriendsList';
import SchedulesUl from '../../components/common/Section/SchedulesUl/SchedulesUl';
import Span from '../../components/common/Span/Span';

const Main = () => {
  return (
    <div className={styles.main}>
      <section className={styles.mainLeftSection}>
        <Span text={'친구 목록'} className={'sectionsSpan'} />
        <FriendsList />
      </section>
      <section className={styles.mainRightSection}>
        <Span text={'계획 일정'} className={'sectionsSpan'} />
        <SchedulesUl />
      </section>
    </div>
  );
};

export default Main;
