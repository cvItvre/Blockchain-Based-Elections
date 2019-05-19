pragma solidity ^0.4.2;

contract Election {
    
    struct Voter {
        address _id;
        string _email;
        bool _rightToVote;
        bool _isVoted;
        uint256 _vote;
    }
    
    struct Candidate {
        string _name;
        uint256 _number;
        uint256 _voteCount;
    }
    
    struct Elections {
        address _electionAdmin;
        string _electionName;
        string _emailDomain;
        uint256 _openingTime;
        uint256 _closingTime;
        mapping(uint256 => Candidate) _candidates;
        mapping(uint256 => uint256) _candidateNumberToID;
        uint256 _candidatesCount;
        mapping(address => Voter) _voters;
        mapping(string => address) _emailToAdress;
        uint256 _votersCount;
    }
    
    address public contractOwner;
    uint256 public electionCount;
    mapping(string => Elections) elections;
    
    function Election() public {
        contractOwner = msg.sender;
        electionCount = 0;
    }
    
    modifier onlyOwner() {
        require (msg.sender == contractOwner);
        _;
    }

    modifier onlyWhileOpen(uint256 _openingTime, uint256 _closingTime) { 
        require (block.timestamp >= _openingTime && block.timestamp < _closingTime); 
        _; 
    }
    
    modifier onlyWhenOver(uint256 _closingTime) { 
        require (block.timestamp >= _closingTime); 
        _; 
    }

    modifier condition(bool _condition) {
    	require (_condition);
    	_;
    }
    
    function createElection( 
    	string memory _electionName, 
    	string memory _emailDomain, 
    	uint256 _openingTime, 
    	uint256 _closingTime)
    public onlyOwner {
        
        electionCount ++;
        elections[_electionName]._electionAdmin = contractOwner;
        elections[_electionName]._electionName = _electionName;
        elections[_electionName]._emailDomain = _emailDomain;
        elections[_electionName]._openingTime = _openingTime;
        elections[_electionName]._closingTime = _closingTime;
        elections[_electionName]._candidatesCount = 0;
        elections[_electionName]._votersCount = 0;

    }
    
    function addCandidates(
    	string memory _electionName, 
    	string memory _candidateName, 
    	uint256 _candidateNumber) 
    public 
    condition(now > elections[_electionName]._openingTime)
    condition(msg.sender == elections[_electionName]._electionAdmin || msg.sender == contractOwner) {
        
        elections[_electionName]._candidatesCount ++;
        elections[_electionName]._candidateNumberToID[_candidateNumber] = elections[_electionName]._candidatesCount;
        elections[_electionName]._candidates[elections[_electionName]._candidatesCount]._name = _candidateName;
        elections[_electionName]._candidates[elections[_electionName]._candidatesCount]._number = _candidateNumber;
        elections[_electionName]._candidates[elections[_electionName]._candidatesCount]._voteCount = 0;

    }        
    
    function giveRightToVote(string memory _electionName, string memory _email) public {
        
        require(elections[_electionName]._emailToAdress[_email] == 0x0000000000000000000000000000000000000000);
        elections[_electionName]._votersCount ++;
        elections[_electionName]._emailToAdress[_email] = msg.sender;
        elections[_electionName]._voters[msg.sender]._id = msg.sender;
        elections[_electionName]._voters[msg.sender]._email = _email;
        elections[_electionName]._voters[msg.sender]._rightToVote = true;
        elections[_electionName]._voters[msg.sender]._isVoted = false;
        
    }
    
    function vote(
        string memory _electionName, 
        uint256 _candidateNumber) 
    public 
    onlyWhileOpen(elections[_electionName]._openingTime, elections[_electionName]._closingTime) {

    	require(elections[_electionName]._voters[msg.sender]._rightToVote == true);
    	require(elections[_electionName]._voters[msg.sender]._isVoted == false);
        
    	elections[_electionName]._voters[msg.sender]._isVoted = true;
    	elections[_electionName]._voters[msg.sender]._vote = _candidateNumber;
    	elections[_electionName]._candidates[elections[_electionName]._candidateNumberToID[_candidateNumber]]._voteCount ++;
        
    }
    
    function winner(
        string memory _electionName) 
    public 
    onlyWhenOver(elections[_electionName]._closingTime) 
    view 
    returns(string memory) {

        uint256 voteCounts = 0;
        string memory _winnerName;

        for (uint i = 1; i <= elections[_electionName]._candidatesCount; i++) {
            if (elections[_electionName]._candidates[i]._voteCount > voteCounts){
                _winnerName = elections[_electionName]._candidates[i]._name;
            }
        }

        return _winnerName;
        
    }
 
    
}


