'use client';
import { useQuery } from "react-query";
import axios from '@/providers/api.provider';
import { useState } from "react";

export default function Welcome()
{
    const [events, setEvents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [instructors, setInstructor] = useState([]);

    const getBannerApi = async () => {
        return await axios.get('/dashboards/events')
    }

    const getCourseApi = async () => {
        return await axios.get('/faculties/courses')
    }

    const getReviewApi = async () => {
        return await axios.get('/comments');
    }

    const getInstructorApi = async () => {
        return await axios.get('/dashboards/teachers');
    }

    useQuery({
        queryKey: ['getBannerKey'],
        queryFn: getBannerApi,
        onSuccess: ({data}) => {
            setEvents(data['data']);
        }
    });

    useQuery({
        queryKey: ['getCourseApi'],
        queryFn: getCourseApi,
        onSuccess: ({data}) => {
            setCourses(data['data']);
        }
    });

    useQuery({
        queryKey: ['getReviewKey'],
        queryFn: getReviewApi,
        onSuccess: ({data}) => {
            setReviews(data['data']);
        }
    });

    useQuery({
        queryKey: ['getInstructorKey'],
        queryFn: getInstructorApi,
        onSuccess: ({data}) => {
            setInstructor(data['data']);
        }
    })

    return (
        <div>
            <br />
            {/* Event */}
            <h1 className="text-red-700">Events</h1>
            <div>
                <ul>
                    {
                        events.map((event, key) => (
                            <li key={key}>{ event['image'] }</li>
                        ))
                    }
                </ul>
            </div>

            <br />
            {/* Program */}
            <h1 className="text-red-700">Programs</h1>
            <div>
                <ul>
                    {
                        courses.map((course, key) => (
                            <li key={key}>
                                <a href="">{ course['image'] }</a>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <br />
            {/* Review */}
            <h1 className="text-red-700">Reviews</h1>
            <div>
                <ul>
                    {
                        reviews.map((review, key) => (
                            <li key={key}>
                                <p>{ review['comment'] }</p>
                                <p>{ review['created_by'] }</p>
                                <p>{ review['post'] }</p>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <br />
            {/* Instructor */}
            <h1 className="text-red-700">Instructor</h1>
            <div>
                <ul>
                    {
                        instructors.map((instructor, key) => (
                            <li key={key}>
                                <p>
                                    { instructor['image'] }
                                </p>
                                <h3>{ instructor['name'] }</h3>
                                <h4>Position</h4>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}