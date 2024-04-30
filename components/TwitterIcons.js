import React from 'react';
import { View,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spacing from '../utils/Spacing';

export default function TwitterIcons({postLikes,postComments,postRetweets}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center',marginVertical: Spacing,marginTop:Spacing*2 }}>
      {/* Like icon */}
      <TouchableOpacity>
      <View style={{
        flexDirection: 'row',
        alignItems:'center',
        marginRight: Spacing*2.3
      }}>
<Ionicons name="heart-outline" size={28} color="grey" style={{ marginRight: Spacing* 0.3 , color:'black'}} />
<Text style={{
    color: 'grey'
}}>
  {postLikes}
</Text>



            
      </View>

</TouchableOpacity>
      

      {/* Comment icon */}

      <TouchableOpacity>
      <View style={{
        flexDirection: 'row',
        alignItems:'center',
        marginRight: Spacing*2.3

      }}>
      <Ionicons name="chatbubble-outline" size={28} color="grey" style={{ marginRight: 0.3*Spacing , color:'black' }} />
      <Text style={{
    color: 'grey'
}}>
  {postComments}
</Text>



            
      </View>

</TouchableOpacity>

      {/* Retweet icon */}

      <TouchableOpacity>
      <View style={{
        flexDirection: 'row',
        alignItems:'center',
        marginRight: Spacing*2.3

      }}>
      <Ionicons name="repeat-outline" size={28} color="grey" style={{ marginRight: 0.3*Spacing , color:'black'}}/>
      <Text style={{
    color: 'grey'
}}>
  {postRetweets}
</Text>



            
      </View>

</TouchableOpacity>

<View style={{flex:1,alignItems:'flex-end'}}>
<TouchableOpacity>
<Ionicons name="share-social-outline" size={24} color="grey" style={{ color:'black'}} />

</TouchableOpacity>
</View>
    </View>
  );
}
