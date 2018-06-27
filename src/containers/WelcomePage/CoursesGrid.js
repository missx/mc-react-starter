import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import CheckTile from '../../components/common/CheckTile'
import TileCaption from '../../components/common/TileCaption'
import { ComingSoonTile } from '../../components/common/ComingSoonTile'

export default class CoursesList extends PureComponent {
  static propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape({
      instructorName: PropTypes.string.isRequired,
    })),
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    courses: [],
    onSelect: () => undefined,
  }

  handleSelect = (course) => {
    const { onSelect } = this.props

    onSelect(course)
  }

  render () {
    const { courses } = this.props

    return (
      <div className='row'>
        {courses.map((course, key) => {
          if (course.status === 'pre_enroll') {
            return (
              <div
                className='col-xl-4 col-lg-6 col-md-6'
                key={key}
              >
                <ComingSoonTile
                  imageUrl={course.previewImage}
                  onCheck={() => this.handleSelect(course)}
                  aspectRatio='1000x609'
                >
                  <TileCaption
                    title={course.instructorName}
                    subtitle={course.className}
                    position='horizontal-centered'
                    {...this.props}
                  />
                </ComingSoonTile>
              </div>
            )
          }
          return (
            <div
              className='col-xl-4 col-lg-6 col-md-6'
              key={key}
            >
              <CheckTile
                imageUrl={course.previewImage}
                checked={course.selected}
                slug={course.slug}
                onCheck={() => this.handleSelect(course)}
                aspectRatio='1000x609'
                animationStyle='hover-zoom'
              >
                <TileCaption
                  title={course.instructorName}
                  subtitle={course.className}
                  position='horizontal-centered'
                  {...this.props}
                />
              </CheckTile>
            </div>
          )
        })}
      </div>
    )
  }
}
