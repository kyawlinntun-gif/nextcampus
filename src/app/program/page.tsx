'use client';
import axios from '@/providers/api.provider';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';

export default function Program()
{

    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);

    const getCategoryApi = async () => {
        return await axios.get('dashboards/categories');
    }

    const getCourseWithCategoryApi = async (id: number) => {
        console.log(id);
        return await axios.get(`faculties/courses/category/${id}`);
    }

    const {refetch: refetchCategoryApi} = useQuery({
        queryKey: ['getCategoryKey'],
        queryFn: getCategoryApi,
        onSuccess: ({data}) => {
            setCategories(data['data']);
        }
    })

    const {mutate: mutateCourseWithCategoryApi} = useMutation({
        mutationKey: ['getCourseWithCategoryApi'],
        mutationFn: (id: number) => getCourseWithCategoryApi(id),
        onSuccess: ({data}) => {
            setCourses(data['data']);
            refetchCategoryApi();
        }
    })

    useEffect(() => {
        mutateCourseWithCategoryApi(1);
    }, []);

    const handleCourseWithCategory = (id: number) => {
        mutateCourseWithCategoryApi(id);
    }

    return (
        <div>
            <br />
            <h1>Program</h1>
            <br />
            <div>
                <ul>
                    {
                        categories.map((category, key) => (
                            <li key={key}>
                                <button onClick={() => handleCourseWithCategory(category['id'])}>{ category['name'] }</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <br />
            <div>
                {
                    courses.map((course, key) => (
                        <li key={key}>
                            <h1>{ course['name'] }</h1>
                            <p>
                                {
                                    course['image']
                                }
                            </p>
                            <span>
                                {
                                    course['created_by']
                                }
                            </span>
                            <p>
                                {
                                    course['description']
                                }
                            </p>
                        </li>
                    ))
                }
            </div>
        </div>
    )
}