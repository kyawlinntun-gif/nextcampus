'use client';
import { useParams } from "next/navigation";
import axios from '@/providers/api.provider';
import { useQuery } from "react-query";
import { useState } from "react";

interface CourseInterface {
    name: string,
    image: string,
    created_by: string,
    description: string
}

export default function Program()
{
    const params = useParams();
    const id = params?.id;
    const [course, setCourse] = useState<CourseInterface>();

    const getProgramShowApi = async () => {
        return await axios.get(`/faculties/courses/${id}`);
    }

    useQuery({
        queryKey: ['getProgramShowKey'],
        queryFn: getProgramShowApi,
        onSuccess:({data}) => {
            setCourse(data['data']);
        }
    })

    return(
        <div>
            <br />
            <h1>{ course?.name }</h1>
            <p>{ course?.image }</p>
            <h3>{ course?.created_by }</h3>
            <p>
                { course?.description }
            </p>
        </div>
    )
}