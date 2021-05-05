const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require ('graphql');

const droids = [
    { 
      id: 0,
      model: 'C-3PO',
      forBattle : false,
    },
    { 
      id: 1,
      model: 'R2-D2',
      forBattle : false,
    },
    { 
      id: 2,
      model: 'IG-11',
      forBattle : true,
    },
    { 
      id: 3,
      model: 'OOM-9',
      forBattle : true,
    },
    { 
      id: 4,
      model: 'EV-9D9',
      forBattle : false,
    }
  ];

const DroidType = new GraphQLObjectType({
    name: "Droid",
    description: "droid info.",
    fields: () => ({
        id: { 
            type: GraphQLNonNull(GraphQLInt),
            // resolve : (source) => {
            //     console.log({source});
            //     return source.id;
            // }
        },
        model: { type: GraphQLNonNull(GraphQLString)},
        forBattle: { type: GraphQLNonNull(GraphQLBoolean)}
    })    
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: () => ({            
            droids: {
                type: GraphQLList(DroidType),
                description: "List of All droids",
                args: {
                    forBattle: {type: GraphQLBoolean}
                },
                resolve : (source, args) => {
                    console.log({source, args})
                    return droids.filter(droid => droid.forBattle === args.forBattle)
                }
                // resolve: (source) => {
                //     console.log("source:", source)
                //     return {}
                // }
            },
            droid: {
                type: DroidType,
                description: "A Droid",
                args: {
                    id: {type: GraphQLInt}
                },
                resolve: (source, args) => droids.find(droid => droid.id === args.id)
            }
        })
    })
})

const query = `{ 
    droids(forBattle: true) { 
        id        
        model 
        forBattle 
    }
    droid(id: 2) {
        id
        model
        forBattle
    }
}`

// droids { 
//     id        
//     model 
//     forBattle 
// }


// droid(id: 2) {
//     id
//     model
//     forBattle
// }
graphql(schema, query).then(result => {
    console.log(result.data);
}).catch(err => {
    console.error(err);
});