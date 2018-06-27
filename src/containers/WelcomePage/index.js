import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import CoursesGrid from './CoursesGrid'
import courses from './courses'

class WelcomePage extends PureComponent {

  static defaultProps = {
    courses: [],
    selectedCourses: [],
    onLoad: () => undefined,
    onSelect: () => undefined,
  }

  componentDidMount () {
    const { onLoad, ...otherProps } = this.props
    onLoad(otherProps)
  }

  render () {
    const selectedCourses = []
    const hasSelectedCourses = selectedCourses.length > 1

    return (
      <div className='courses-page'>
        <section className='section-courses-header'>
          <div className='section-courses-header__gradient' />
          <div className='container'>
            <h2 className='heading-primary'>Get started with MasterClass</h2>
            <p className='paragraph'>Choose two or more classes to get going</p>
          </div>
        </section>
        <section className='section-courses-grid'>
          <div className='container thirty-gutter-grid'>
            <CoursesGrid courses={courses} />
          </div>
        </section>

        {hasSelectedCourses && (
          <section className='section-courses-footer active'>
            <Link
              to='/courses/selected'
              className='c-button c-button--wide c-button--primary'
              onClick={() => {
                track('Onboarding Click', {
                  action: 'continue',
                  location: 'footer',
                })
              }}
            >
              Continue
            </Link>
          </section>
        )}

        <footer className='footer-minimal active'>
          Footer
        </footer>
      </div>
    )
  }
}

export default WelcomePage