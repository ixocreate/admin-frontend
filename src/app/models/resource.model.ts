import {ResourceModelControl, ResourceModelSchema} from '../../kiwi/models';

export class ModelSchemas {

    static all = [
        /**
         * Define your custom model schemas here
         */
        <ResourceModelSchema>{
            name: 'my-resource',
            label: 'Contact',
            labelPlural: 'Contacts',
            controls: [
                <ResourceModelControl>{
                    name: 'title',
                    label: 'Title',
                },
                <ResourceModelControl>{
                    name: 'address',
                    label: 'Address',
                    schema: 'address',
                },
                /**
                 * enable repeatable controls of different types ("blocks" in kiwi v3)
                 */
                // <ResourceModelControl>{
                //     name: 'blocks',
                //     repeatable: true,
                //     options: <ResourceModelRelation>[
                //         {
                //             key: '',
                //             name: '',
                //         }
                //     ],
                // },
            ]
        },
        <ResourceModelSchema>{
            name: 'address',
            label: 'Address',
            labelPlural: 'Addresses',
            controls: [
                <ResourceModelControl>{
                    name: 'street',
                    label: 'Street',
                },
                <ResourceModelControl>{
                    name: 'number',
                    label: 'Number',
                },
                <ResourceModelControl>{
                    name: 'additional',
                    label: 'Additional',
                },
                <ResourceModelControl>{
                    name: 'zip',
                    label: 'ZIP',
                },
                <ResourceModelControl>{
                    name: 'city',
                    label: 'City',
                },
                <ResourceModelControl>{
                    name: 'country',
                    label: 'Country',
                },
            ]
        },
    ];
}
